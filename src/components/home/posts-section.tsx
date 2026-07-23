import { Media, Post } from "@/payload-types"
import Image from "next/image"

interface PostsSectionProps {
  posts: Post[]
}

function formatDate(isoString: string): string {
  if (!isoString) return ''
  return new Date(isoString).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
}

export default function PostsSection({ posts }: PostsSectionProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold tracking-tight text-slate-800 text-center sm:text-4xl mb-8">
        Последние новости
      </h2>

      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {posts.map((post) => {
          const imageUrl =
            typeof post.image === 'object' && post.image !== null
              ? (post.image as Media).url
              : ''

          return (
            <article
              key={post.id}
              className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {imageUrl && (
                <div className="relative w-full h-68 bg-slate-100">
                  <Image
                    src={imageUrl}
                    alt={post.title || ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-xl font-semibold text-slate-900 line-clamp-2 mb-3">
                  {post.title}
                </h3>

                <span className="mt-auto text-sm font-medium text-slate-500">
                  {formatDate(post.updatedAt)}
                </span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
