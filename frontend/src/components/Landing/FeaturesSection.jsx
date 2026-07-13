import { Card, CardContent } from "@/components/ui/card";
import { Edit3, Lock, Database, MessageSquare, Sparkles, CircleCheckBig } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Edit3,
      title: "Rich Text Editor",
      description: "Write blogs effortlessly using our powerful TinyMCE editor",
    },
    {
      icon: MessageSquare,
      title: "Commenting System",
      description: "Readers can share their thoughts through comments",
    },
    {
      icon: Lock,
      title: "Flexible Authentication",
      description: "Choose between Email or Google OAuth for quick access",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Suggestions",
      description: "Smart, personalized content improvements tailored to your writing",
    },
  ];

  return (
    <section className="border-b bg-neutral-100 px-4 py-16">
      <div className="mx-10">
        <div className="mb-12 text-center">
          <h2 className="text-heading mb-4">
            <CircleCheckBig className="mt-1 mr-2" size={26} />
            Everything you need to blog
          </h2>
          <p className="text-sm">
            Powerful features designed to help you create, share, and grow your content effortlessly
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="border border-gray-400 shadow-sm transition-shadow hover:shadow-xl"
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-neutral-100">
                    <IconComponent className="text-primary h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
