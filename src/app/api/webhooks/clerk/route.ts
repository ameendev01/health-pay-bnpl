
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

  if (!process.env.CLERK_WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = await verifyWebhook(req, {
      signingSecret: process.env.CLERK_WEBHOOK_SECRET,
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

    // Insert the new user into your Supabase `users` table
    const { error } = await supabaseAdmin.from("users").insert({
      clerk_user_id: id,
      email: email,
      first_name: first_name,
      last_name: last_name,
    });

    if (error) {
      console.error("Error inserting new user into Supabase:", error);
      return new Response("Error occured while creating user", { status: 500 });
    }
  }

  return new Response("", { status: 200 });
}
