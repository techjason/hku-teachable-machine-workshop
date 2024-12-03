import { ArrowDownRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge variant="outline">
              Interactive Workshop by HKU
              <ArrowDownRight className="ml-2 size-4" />
            </Badge>
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              Introduction to Machine Learning with Teachable Machine
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              Get hands-on experience with machine learning! Learn how to train
              your own AI model using Google&apos;s Teachable Machine. Perfect
              for beginners - no coding required.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button className="w-full sm:w-auto">
                Start Workshop <ArrowDownRight className="size-4" />
              </Button>
            </div>
          </div>
          <Image
            src="/hero-notion.png"
            alt="Hero image"
            className="max-h-96 w-full rounded-md object-contain"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
