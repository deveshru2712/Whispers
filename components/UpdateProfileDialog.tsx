"use client";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./tiptap-ui-primitive/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { updateUserInfo } from "@/lib/actions/user.action";
import { toast } from "sonner";

interface UpdateProfileDialogProps {
  isOpen: boolean;
  handleDialogClose: () => void;
  user: User; // Now uses the global User type
  onUpdateSuccess?: (updatedUser: User) => void;
}

// Remove the local User interface - it's now global

type UpdateForm = z.infer<typeof updateFormSchema>;

const updateFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(15, "Name cannot exceed 15 characters"),
  bio: z
    .string()
    .min(3, "Bio must be at least 3 characters")
    .max(50, "Bio cannot exceed 50 characters"),
});

const UpdateProfileDialog = ({
  isOpen,
  handleDialogClose,
  user,
  onUpdateSuccess,
}: UpdateProfileDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const updateForm = useForm<UpdateForm>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      name: user.name || "",
      bio: user.bio || "",
    },
  });

  // Reset form when user data changes or dialog opens
  useEffect(() => {
    if (isOpen) {
      updateForm.reset({
        name: user.name || "",
        bio: user.bio || "",
      });
    }
  }, [isOpen, user, updateForm]);

  const onUpdateProfile = async (userId: string, formData: UpdateForm) => {
    setIsLoading(true);
    try {
      const data = await updateUserInfo(user.id, formData);

      // Ensure the returned data matches the expected User type
      const updatedUser: User = {
        id: user.id,
        name: data.name || user.name,
        bio: data.bio || user.bio,
        username: user.username,
        email: user.email,
      };

      // Update the form default values with the new data
      updateForm.reset({
        name: updatedUser.name,
        bio: updatedUser.bio,
      });

      // Notify parent component about the update
      if (onUpdateSuccess) {
        onUpdateSuccess(updatedUser);
      }

      toast.success("Profile updated successfully");
      handleDialogClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  function onSubmit(values: UpdateForm) {
    onUpdateProfile(user.id, values);
  }

  if (!user || !isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-in fade-in-90 zoom-in-90"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Edit Profile
          </h2>
          <button
            onClick={handleDialogClose}
            className="rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close dialog"
            disabled={isLoading}
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <Form {...updateForm}>
            <form
              onSubmit={updateForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={updateForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        className="w-full border"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={updateForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little about yourself"
                        className="w-full min-h-[100px] resize-none"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <div className="flex justify-between">
                      <FormMessage className="text-red-500 text-sm" />
                      <span className="text-xs text-gray-500">
                        {field.value?.length || 0}/50
                      </span>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDialogClose}
                  className="px-4"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-4 bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileDialog;
