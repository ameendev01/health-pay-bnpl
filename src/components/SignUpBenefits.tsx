import { Calendar, TrendingUp, Target } from 'lucide-react';

const benefits = [
  {
    icon: Calendar,
    title: 'Easy Appointment Booking',
    description: 'Facilitate instant, secure messaging between patients and pharmacists, ensuring timely and effective communication.',
  },
  {
    icon: TrendingUp,
    title: 'Increase Clinical Billing',
    description: 'Our interface simplifies the booking process, making it easy for patients to schedule and manage their schedules efficiently.',
  },
  {
    icon: Target,
    title: 'Improve Patient Outcomes',
    description: 'Tailor care plans and follow-ups to meet the unique needs of each patient, enhancing their overall healthcare experience.',
  },
];

type Benefit = (typeof benefits)[number];

// 2️⃣  Use that union for your props
const BenefitItem = ({ icon: Icon, title, description }: Benefit) => (
  <div className="flex items-start space-x-4">
    <div className="w-6 h-6 bg-[#dbeafe] rounded-lg flex items-center justify-center mt-1">
      <Icon className="w-4 h-4 text-[#3b82f6]" />
    </div>
    <div>
      <h3 className="text-[16px] font-semibold text-[#1f2937] mb-2">{title}</h3>
      <p className="text-[14px] text-[#6b7280] leading-[20px]">{description}</p>
    </div>
  </div>
);

export const SignUpBenefits = () => (
  <div className="hidden lg:flex lg:w-[400px] xl:w-[480px] flex-col justify-between p-12 bg-[#d5f9fb]">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-lg flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-sm"></div>
      </div>
      <span className="text-[22px] font-semibold text-[#1f2937]">Health Pay</span>
    </div>
    <div className="space-y-12">
      <div>
        <h1 className="text-[26px] font-semibold text-[#1f2937] leading-[35px] mb-8">
          Increase Your Clinical<br />
          Revenue with Health Pay
        </h1>
      </div>
      <div className="space-y-8">
        {benefits.map((benefit, index) => (
          <BenefitItem key={index} {...benefit} />
        ))}
      </div>
    </div>
    <div className="text-[14px] text-[#6b7280]">© 2024 Health Pay · Privacy & Terms</div>
  </div>
);
