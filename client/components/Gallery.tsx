import GalleryItem from './GalleryItem';

const dummyImages = [
  {
    id: '1',
    src: '/image1.jpg',
    title: 'Sunset Over Hills',
    author: 'Jane Doe',
  },
  {
    id: '2',
    src: '/image1.jpg',
    title: 'Forest in Fog',
    author: 'John Smith',
  },
  {
    id: '3',
    src: '/image1.jpg',
    title: 'Mountain Peak',
    author: 'Alice Green',
  },
  {
    id: '4',
    src: '/image1.jpg',
    title: 'Calm Lake',
    author: 'Bob Brown',
  },
  {
    id: '5',
    src: '/image1.jpg',
    title: 'Evening Horizon',
    author: 'Alice Green',
  },
  {
    id: '6',
    src: '/image1.jpg',
    title: 'Deep Reflection',
    author: 'Bob Brown',
  },
];

export default function Gallery() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      {dummyImages.map((img) => (
        <GalleryItem
          key={img.id}
          id={img.id}
          src={img.src}
          title={img.title}
          author={img.author}
        />
      ))}
    </div>
  );
}
