import { createSupabaseAuthenticatedClient } from "./supabase";

const supabaseImageUploader = async ({
  file,
  session,
}: ImageUploaderProps): Promise<UploadResult> => {
  const fileExt = file.name.split(".").pop();
  if (!fileExt) {
    throw new Error("File has no extension");
  }

  const timestamp = Date.now();
  const fileName = `${timestamp}.${fileExt}`;
  const filePath = `users/${session.user.id}/${fileName}`;

  const supabase = createSupabaseAuthenticatedClient(session);

  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Upload error:", uploadError.message);
    throw new Error(uploadError.message || "Failed to upload image");
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("post-images").getPublicUrl(filePath);

  console.log("here is the public url", publicUrl);

  return {
    path: filePath,
    publicUrl: publicUrl,
  };
};

export default supabaseImageUploader;
