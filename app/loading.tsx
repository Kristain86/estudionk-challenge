export default function Loading() {
  return (
    <div className='min-h-screen flex flex-col bg-primary-black'>
      <main className='flex-grow flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-green' />
      </main>
    </div>
  );
}
