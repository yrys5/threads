import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// generated by shadcn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// created by chatgpt
export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

// created by chatgpt
export function formatDateStringLocal(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}

export function formatDateStringUS(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', options);

  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true, // Optional: set to false if you prefer 24-hour format
  });

  return `${formattedDate}, ${time}`;
}

export function formatElapsedTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const elapsed = now.getTime() - date.getTime(); // milliseconds between now and date

  // Calculate elapsed time in different units
  const minutes = Math.round(elapsed / (1000 * 60));
  const hours = Math.round(elapsed / (1000 * 60 * 60));
  const days = Math.round(elapsed / (1000 * 60 * 60 * 24));
  const weeks = Math.round(elapsed / (1000 * 60 * 60 * 24 * 7));
  const months = Math.round(elapsed / (1000 * 60 * 60 * 24 * 30));
  const years = Math.round(elapsed / (1000 * 60 * 60 * 24 * 365));

  // Return the largest relevant unit
  // if (years > 0) return `${years} year${years > 1 ? 's' : ''}`;
  // if (months > 0) return `${months} month${months > 1 ? 's' : ''}`;
  // if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''}`;
  // if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  // if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  // if (minutes > 0) return `${minutes} min`;
  // return 'Just now';
  if (years > 0) return `${years}y ago`;
  if (months > 0) return `${months}mo ago`;
  if (weeks > 0) return `${weeks}w ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'now';
}


// created by chatgpt
export function formatThreadCount(count: number): string {
  if (count === 0) {
    return "No Threads";
  } else {
    const threadCount = count.toString().padStart(2, "0");
    const threadWord = count === 1 ? "Thread" : "Threads";
    return `${threadCount} ${threadWord}`;
  }
}