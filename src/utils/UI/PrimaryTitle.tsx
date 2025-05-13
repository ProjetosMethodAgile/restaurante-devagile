type PrimaryTitleProps = {
  title: string;
};

export default function PrimaryTitle({ title }: PrimaryTitleProps) {
  return <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>;
}
