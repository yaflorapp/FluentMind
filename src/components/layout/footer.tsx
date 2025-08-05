import Link from "next/link";
import { BrainCircuit } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="font-bold">FluentMind</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FluentMind Inc. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
