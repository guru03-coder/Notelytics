import { Hero } from "@/components/Hero";
import { StudyTips } from "@/components/StudyTips";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <StudyTips />
    </div>
  );
}
