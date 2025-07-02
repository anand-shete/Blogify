import { Card, CardContent } from "@/components/ui/card";
import { Edit3, Save, Lock, Database, FileEdit, Server, MessageSquare } from "lucide-react";

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
      title: "Secure Authentication",
      description: "Login safely using JWT or Google OAuth integration",
    },
    {
      icon: Database,
      title: "Fast Backend",
      description: "Powered by Node.js, Express, and Redis for efficient caching and performance",
    },
  ];

  return (
    <section className="bg-stone-100 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Everything you need to blog</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Powerful features designed to help you create, share, and grow your content effortlessly
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-sm transition-shadow hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-stone-100">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
