"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ComponentProps, MouseEvent } from "react"

type TransitionLinkProps = ComponentProps<typeof Link>

export function TransitionLink({
  href,
  onClick,
  children,
  ...props
}: TransitionLinkProps) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e)
    if (e.defaultPrevented) return

    e.preventDefault()
    const url = href.toString()

    if (!("startViewTransition" in document)) {
      router.push(url)
      return
    }

    document.startViewTransition(() => {
      router.push(url)
    })
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
