import {NewsPublicDTO} from "@/entities/news";

interface NewsItemProps {
  news: NewsPublicDTO
}

export default function NewsItem({news}: NewsItemProps) {
  return (
    <div>
      <div className="flex gap-2 flex-row w-full items-center">
        <h2 className="sm:text-base font-bold leading-tight flex-1 min-w-0 wrap-break-words">
          {news.title}
        </h2>

        <p
          className=" text-xs text-muted-foreground rounded-xl">
          {new Date(news.publishedAt).toLocaleDateString("uk-UA", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
      {news.description && (
        <p className="ml-4 mt-1 lg:ml-10 text-muted-foreground leading-relaxed wrap-break-words">
          {news.description}
        </p>
      )}
    </div>
  )
}