import React, { useEffect, useRef } from "react";

type ImageProps = {
    src: string;
    height?: number;
    appendImagesPosition?: (value: number) => void;
    domID: string;
};

export const Image: React.FunctionComponent<ImageProps> = React.memo(function Image({
    src,
    height,
    appendImagesPosition,
    domID,
}: ImageProps) {
    const ref = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (ref.current) {
            appendImagesPosition && appendImagesPosition(ref.current.offsetTop);
        }
    }, [appendImagesPosition, ref]);

    return <img src={src} height={height} alt="" id={domID} ref={ref} />;
});
