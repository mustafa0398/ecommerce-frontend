export async function uploadImageWithPath(file: File): Promise<{ url: string; path: string }> {
  // später: Spring-Backend oder S3 Upload
  const url = URL.createObjectURL(file);
  return { url, path: "dummy-path/" + file.name };
}

export async function deleteByPath(_path: string): Promise<void> {
  // aktuell nur Dummy
  console.log("Deleted image at", _path);
}
