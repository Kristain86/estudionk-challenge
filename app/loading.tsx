export default function Loading() {
  return (
    <div className='min-h-screen flex flex-col bg-gray-200'>
      <main className='flex-grow flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900' />
      </main>
    </div>
  );
}
