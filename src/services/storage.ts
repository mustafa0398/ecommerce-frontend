export async function uploadImageWithPath(file: File): Promise<{ url: string; path: string }> {
  const url = URL.createObjectURL(file);
  return { url, path: "dummy-path/" + file.name };
}

export async function deleteByPath(_path: string): Promise<void> {
  console.log("Deleted image at", _path);
}
