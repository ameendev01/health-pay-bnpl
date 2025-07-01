import { NextRequest } from "next/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { verifyWebhook } from "@clerk/nextjs/webhooks";

// Create a Supabase client with the service role key for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  // const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!process.env.CLERK_WEBHOOK_SIGNING_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SIGNING_SECRE from Clerk Dashboard to .env or .env.local"
    );
  }

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = await verifyWebhook(req, {
      signingSecret: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the event type
  const eventType = evt.type;

  // Handle the user.created event
  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    const email = email_addresses[0]?.email_address;

    if (!id || !email) {
      return new Response("Error: Missing user ID or email", { status: 400 });
    }

    console.log(`Attempting to insert user: ID=${id}, Email=${email}`);
    // Insert the new user into your Supabase `users` table
    const { error } = await supabaseAdmin.from("users").insert({
      user_id: id,
      email: email,
      first_name: first_name,
      last_name: last_name,
    });

    if (error) {
      if (error.code === "23505") {
        console.warn(
          "Supabase: User with this email already exists. Skipping insertion.",
          error
        );
      } else {
        console.error("Supabase: Error inserting new user:", error);
        return new Response("Error occurred while creating user", {
          status: 500,
        });
      }
    } else {
      console.log(`Supabase: User ${id} (${email}) successfully inserted.`);
    }
  } else if (eventType === "user.deleted") {
    const { id } = evt.data;

    if (!id) {
      return new Response("Error: Missing user ID", { status: 400 });
    }

    console.log(`Attempting to delete user: ID=${id}`);
    // Delete the user from your Supabase `users` table
    const { error } = await supabaseAdmin
      .from("users")
      .delete()
      .eq("user_id", id);

    if (error) {
      console.error("Supabase: Error deleting user:", error);
      return new Response("Error occurred while deleting user", {
        status: 500,
      });
    } else {
      console.log(`Supabase: User ${id} successfully deleted.`);
    }
  }

  return new Response("", { status: 200 });
}
