export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
        <h2 className="text-lg font-semibold text-gray-800">
          Backend wacht gerade auf…
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          Da Render Free Instanzen nach Inaktivität einschlafen,
          kann es bis zu 1 Minute dauern, bis die Seite wieder reagiert.
        </p>
      </div>
    </div>
  );
}
