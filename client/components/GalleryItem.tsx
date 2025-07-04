import Link from 'next/link';
import Image from 'next/image';

type Props = {
  id: string;
  src: string;
  title: string;
  author: string;
};

export default function GalleryItem({ id, src, title, author }: Props) {
  return (
    <Link href={`/image/${id}`}>
      <div className="bg-white rounded-md overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition">
        <div className="relative aspect-square overflow-hidden group">
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-3">
          <h2 className="text-sm font-semibold text-gray-800 truncate">{title}</h2>
          <p className="text-xs text-gray-500 mt-1">by {author}</p>
        </div>
      </div>
    </Link>
  );
}
