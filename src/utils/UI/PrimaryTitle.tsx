type PrimaryTitleProps = {
  title: string;
};

export default function PrimaryTitle({title}: PrimaryTitleProps) {
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 border-b border-gray-300">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
    </div>
  );

}
