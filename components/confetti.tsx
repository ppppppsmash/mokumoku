"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import confetti from "canvas-confetti";
import { UserButton } from "@clerk/nextjs";

export function Confetti() {
  const [showDialog, setShowDialog] = useState(false);

  // This would be triggered when a goal is achieved
  // For demo purposes, we'll show it after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDialog(true)
      triggerConfetti()
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const colors = ["#FFC700", "#FF0080", "#00FFFF", "#7928CA"];
    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      })

      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })();
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto">
            <UserButton appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
            }} />
          </div>
          <DialogTitle className="text-center text-2xl mt-4">ようこそ！MokuMokuへ</DialogTitle>
          <DialogDescription className="text-center text-lg">目標を達成して、自分を成長させよう</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <p className="text-center">日々の目標を設定し、進捗を追跡</p>
          <p>頑張りましょう！</p>
        </div>
      </DialogContent>
    </Dialog>
  )
};
