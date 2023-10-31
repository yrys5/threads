"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export default function Loading({ form }: { form: any }) {
  // Or a custom loading skeleton component
  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <Form {...form}>
        <form className="mt-10 flex flex-col justify-start gap-10">
          <div className="flex full-width gap-3 flex-col">
            <div className="text-base-semibold text-light-2">
              Content
            </div>
            <div className="no-focus border border-dark-4 bg-dark-3 text-light-1">
              <Textarea disabled className="bg-dark-3 border-dark-4 border rounded-md" rows={15} />
            </div>
          </div>
          <Button disabled type="submit" className="bg-primary-500">
            Post Thread
          </Button>
        </form>
      </Form>
    </>
  );
}
