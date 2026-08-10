export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Unauthorized</h1>
      <p className="text-gray-600">
        You are not authorized to access this page. Please sign in.401
      </p>
    </div>
  );
}