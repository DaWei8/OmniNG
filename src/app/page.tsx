import NigeriaMap from "@/components/NigeriaMap";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black p-4">
      <div className="text-center mb-8 mt-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          Explore Nigeria
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Click on a state to learn more about its unique heritage.
        </p>
      </div>

      <NigeriaMap className="w-full max-w-5xl" />
    </div>
  );
}
