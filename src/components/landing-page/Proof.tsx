import { BadgeCheck } from "lucide-react"

export const ProofSection = () => {
	return (
		<section id="proof" className="">
				<div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
				  <div className="mx-auto max-w-4xl text-center">
					<h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
					  Trusted by healthcare providers nationwide
					</h2>
					<p className="mt-4 text-lg text-slate-600">
					  Join thousands of clinics already using Breeze to transform their
					  patient financing.
					</p>
					<p className="mt-2 text-sm text-slate-500">
					  Your data is secure with us — we never share personal information
					</p>
				  </div>
		
				  {/* Trusted By Companies */}
		
				  {/* Compliance & Security */}
				  <div className="mt-16">
					<h3 className="text-center text-xl font-semibold text-slate-900 mb-8">
					  Enterprise-grade security & compliance
					</h3>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					  {[
						{
						  name: "HIPAA Compliant",
						  description: "Patient data protection",
						},
						{
						  name: "PCI DSS Certified",
						  description: "Payment security standards",
						},
						{
						  name: "SOC 2 Type II",
						  description: "Security & availability controls",
						},
						{
						  name: "Bank-Level Security",
						  description: "256-bit encryption & fraud protection",
						},
					  ].map((badge, index) => (
						<div
						  key={index}
						  className="rounded-lg border border-slate-200 bg-white p-4 text-center"
						>
						  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 mx-auto mb-3">
							<BadgeCheck className="h-4 w-4 text-emerald-600" />
						  </div>
						  <h4 className="text-sm font-semibold text-slate-900 mb-1">
							{badge.name}
						  </h4>
						  <p className="text-xs text-slate-600">{badge.description}</p>
						</div>
					  ))}
					</div>
				  </div>
				</div>
			  </section>
	)
}