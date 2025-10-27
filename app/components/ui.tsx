import type { ComponentProps, PropsWithChildren } from "react";
import React from "react";
import { Link as RRLink } from "react-router";
import { cn } from "../lib/utils";

export function Container({ children, className, ...props }: PropsWithChildren & ComponentProps<"div">) {
  return (
    <div 
      className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)} 
      {...props}
    >
      {children}
    </div>
  );
}

export function Title({ 
  children, 
  className, 
  as: Component = "h1",
  ...props 
}: PropsWithChildren & ComponentProps<"h1"> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) {
  return (
    <Component
      className={cn(
        "font-bold tracking-tight text-neutral-900 dark:text-neutral-100 title-enhanced",
        {
          "text-4xl sm:text-5xl lg:text-6xl": Component === "h1",
          "text-3xl sm:text-4xl lg:text-5xl": Component === "h2",
          "text-2xl sm:text-3xl lg:text-4xl": Component === "h3",
          "text-xl sm:text-2xl lg:text-3xl": Component === "h4",
          "text-lg sm:text-xl lg:text-2xl": Component === "h5",
          "text-base sm:text-lg lg:text-xl": Component === "h6",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Subtitle({ children, className, ...props }: PropsWithChildren & ComponentProps<"h2">) {
  return (
    <h2 
      className={cn(
        "text-xl sm:text-2xl text-neutral-600 dark:text-neutral-400 font-medium",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function PageHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center space-y-6">
      <Title className="gradient-text">{title}</Title>
      {subtitle && <Subtitle className="text-xl">{subtitle}</Subtitle>}
    </div>
  );
}

export function Button({ 
  className = "", 
  variant = "default",
  size = "default",
  asChild = false,
  ...props 
}: ComponentProps<"button"> & {
  variant?: "default" | "secondary" | "ghost" | "gradient" | "outline";
  size?: "xs" | "sm" | "default" | "lg";
  asChild?: boolean;
}) {
  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses = {
    default: "btn-primary shadow-lg hover:shadow-xl",
    secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 rounded-lg",
    ghost: "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg",
    gradient: "hero-gradient text-white shadow-lg hover:shadow-xl hover:scale-105 rounded-lg",
    outline: "btn-secondary border-2 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg",
  };
  
  const sizeClasses = {
    xs: "h-8 px-3 py-1 text-xs",
    sm: "h-9 px-4 py-2 text-sm",
    default: "h-12 px-6 py-3",
    lg: "h-14 px-8 py-4 text-lg",
  };
  
  const buttonProps = {
    ...props,
    className: cn(baseClasses, variantClasses[variant], sizeClasses[size], className),
  };
  
  if (asChild) {
            const { children, ...restProps } = buttonProps;
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...restProps,
        className: cn((children.props as any)?.className, buttonProps.className),
      } as any);
    }
  }
  
  return (
    <button {...buttonProps} />
  );
}

export function Input({ className = "", variant = "default", ...props }: ComponentProps<"input"> & {
  variant?: "default" | "error" | "success";
}) {
  const variantClasses = {
    default: "border-neutral-200 focus-visible:border-primary-500 focus-visible:ring-primary-500",
    error: "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500",
    success: "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500",
  };
  
  return (
    <input
      {...props}
      className={cn(
        "flex h-12 w-full rounded-lg border-2 bg-white px-4 py-3 text-sm transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500",
        variantClasses[variant],
        className
      )}
    />
  );
}

export function Link({
  className = "", 
  variant = "default", 
  ...props 
}: ComponentProps<typeof RRLink> & { 
  variant?: "default" | "ghost" | "button" | "gradient" | "link";
}) {
  const baseClasses = "inline-flex items-center text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses = {
    default: "text-primary-600 hover:text-primary-700 hover:underline",
    ghost: "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 px-3 py-2 rounded-lg",
    button: "btn-primary",
    gradient: "hero-gradient text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl hover:scale-105",
    link: "text-primary-600 underline-offset-4 hover:underline hover:text-primary-700",
  };
  
  return (
    <RRLink 
      {...props} 
      className={cn(baseClasses, variantClasses[variant], className)} 
    />
  );
}

export function Card({ children, className, ...props }: PropsWithChildren & ComponentProps<"div">) {
  return (
    <div
      className={cn("card p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({ 
  children, 
  className, 
  variant = "default",
  ...props 
}: PropsWithChildren & ComponentProps<"span"> & {
  variant?: "default" | "secondary" | "accent" | "outline";
}) {
  const variantClasses = {
    default: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200",
    secondary: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
    accent: "bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200",
    outline: "border border-neutral-300 text-neutral-700 dark:border-neutral-600 dark:text-neutral-300",
  };
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full h-9 px-3 py-1 text-xs font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function TextCard({
  title,
  content,
  isLink = true,
  tags,
  link,
  clampContent = true,
  links,
  ...props
}: ComponentProps<"div"> & {
  title: string;
  content?: string;
  isLink?: boolean;
  tags?: string[] | string;
  link?: string;
  links?: Array<{ text: string; link: string }>;
  clampContent?: boolean;
}) {
  const tagArray = Array.isArray(tags) ? tags : tags ? String(tags).split(",") : [];
  
  return (
    <Card className="group hover:shadow-xl transition-all duration-300" {...props}>
      <div className="space-y-4">
        <div className="space-y-2">
          {isLink && link ? (
            <Link 
              to={link} 
              className="text-xl font-bold text-neutral-600 dark:text-neutral-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 line-clamp-2"
            >
              {title}
            </Link>
          ) : (
            <h3 className="text-xl font-bold text-neutral-600 dark:text-neutral-300 line-clamp-2">
              {title}
            </h3>
          )}
          {content && (
            <p className={`text-neutral-600 dark:text-neutral-400 ${clampContent ? 'line-clamp-3' : ''}`}>
              {content}
            </p>
          )}
        </div>
        
        {tagArray.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tagArray.slice(0, 3).map((tag) => (
              <Badge key={tag.trim()} variant="secondary" className="text-xs">
                {tag.trim()}
              </Badge>
            ))}
            {tagArray.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tagArray.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        {links && links.length > 0 ? (
          <div className="pt-2 flex flex-wrap gap-2">
            {links.map((linkItem, index) => (
              <Link 
                key={index}
                to={linkItem.link}
                variant="default"
                className="inline-flex items-center gap-2"
              >
                {linkItem.text}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        ) : isLink && link ? (
          <div className="pt-2">
            <Link 
              to={link}
              variant="default"
              className="inline-flex items-center gap-2"
            >
              Read More
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ) : null}
      </div>
    </Card>
  );
}

