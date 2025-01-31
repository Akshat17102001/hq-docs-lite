// "use client";
// import { getMDXComponent } from "mdx-bundler/client";
// import Image from "next/image";
// import { useMemo } from "react";
// import { CustomCode, Pre } from "./custom-code";
// import CustomLink from "./custom-link";

// const MDXComponentsMap = {
//   a: CustomLink,
//   Image,
//   img: ({ ...props }: any) => {
//     console.log("props", props);
//     return <img className="border rounded-lg" {...props} />;
//   },
//   // video: ({ src, controls = true, ...props }: any) => (
//   //   <video
//   //     className="rounded-lg border mt-4"
//   //     src={src}
//   //     controls={controls}
//   //     {...props}
//   //   >
//   //     Your browser does not support the video tag.
//   //   </video>
//   // ),

//   pre: Pre,
//   code: CustomCode,
// };

// console.log("MDX component is", MDXComponentsMap);

// type MDXComponentProps = {
//   content: string;
//   components?: Record<string, any>;
// };

// export const MDXComponent = ({
//   content,
//   components = {},
// }: MDXComponentProps) => {
//   console.log("content", content);
//   const Component = useMemo(() => getMDXComponent(content), [content]);

//   return (
//     <Component
//       components={
//         {
//           ...MDXComponentsMap,
//           ...components,
//         } as any
//       }
//     />
//   );
// };

// export default MDXComponent;

"use client";
import { getMDXComponent } from "mdx-bundler/client";
import Image from "next/image";
import { useMemo } from "react";
import { CustomCode, Pre } from "./custom-code";
import CustomLink from "./custom-link";
import ReactPlayer from "react-player";
const MDXComponentsMap = {
  a: CustomLink,
  Image,
  img: ({ src, alt, ...props }: any) => {
    // Check if the image is actually a video placeholder
    console.log("src alt", src, alt, props);
    const isVideo = alt?.match(/\.(mp4|webm|mov)$/i) || alt?.includes('youtube.com') || alt?.includes('vimeo.com')
    if (isVideo) {
      return (
        <div className="
          my-8 
          rounded-xl 
          border 
          border-gray-200 
          dark:border-gray-800 
          overflow-hidden 
          shadow-lg 
          w-full 
          max-w-4xl 
          mx-auto
        ">
          <ReactPlayer
            url={alt}
            controls
            width="100%"
            height="480px"
            playing={false}
            style={{
              aspectRatio: '16/9',
              backgroundColor: '#000'
            }}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0
                }
              }
            }}
          />
        </div>
      );
    }
    return <img className="border rounded-lg" src={src} alt={alt} {...props} />;
  },
  pre: Pre,
  code: CustomCode,
};

type MDXComponentProps = {
  content: string;
  components?: Record<string, any>;
};

export const MDXComponent = ({
  content,
  components = {},
}: MDXComponentProps) => {
  const Component = useMemo(() => getMDXComponent(content), [content]);

  return (
    <Component
      components={
        {
          ...MDXComponentsMap,
          ...components,
        } as any
      }
    />
  );
};

export default MDXComponent;
