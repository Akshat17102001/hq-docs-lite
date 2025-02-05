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
        <div className="rounded-lg border mt-4 w-full">
<ReactPlayer
        url={alt}
        controls
        width="100%"
        height="auto"
        playing={false}  // Auto-play can be enabled if needed
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
        components={{
          ...MDXComponentsMap,
          ...components,
        } as any}
      />
   
  );
};


export default MDXComponent;
