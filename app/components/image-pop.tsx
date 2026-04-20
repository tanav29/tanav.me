import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function ImagePop() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          alt="my pfp"
          className="ring-4 ring-(--text-muted)/20 rounded-xl cursor-pointer select-none active:translate-y-0.5 w-24"
          src="/pfp.png"
          draggable={false}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>My face</DialogTitle>
        </DialogHeader>
        <img
          alt="my pfp"
          className="rounded-xl select-none w-full"
          src="/pfp.png"
          draggable={false}
        />
      </DialogContent>
    </Dialog>
  );
}
