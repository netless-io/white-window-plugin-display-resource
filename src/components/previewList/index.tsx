import React, { useCallback, useEffect, useRef } from "react";
import "./style.less";
import { WhiteScene } from "white-web-sdk";
import { useRecoilState, useRecoilValue } from "recoil";
import { operableState, pageNumberState, showPreviewListState } from "../../recoil/State";
import classNames from "classnames";
import { Image } from "../image";

type PreviewListProps = {
    scenes: Array<Required<WhiteScene>>;
};

export const PreviewList: React.FunctionComponent<PreviewListProps> = ({
    scenes,
}: PreviewListProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [page, setPage] = useRecoilState(pageNumberState);
    const operable = useRecoilValue(operableState);
    const showPreviewList = useRecoilValue(showPreviewListState);

    const scroll = useCallback(
        (child: HTMLImageElement) => {
            if (!ref.current) {
                return;
            }

            const childRect = child.getBoundingClientRect();
            const parentRect = ref.current.getBoundingClientRect();

            if (childRect.top < 0) {
                ref.current.scrollTop = child.offsetTop;
                return;
            }

            if (childRect.bottom > parentRect.bottom) {
                ref.current.scrollTop =
                    ref.current.scrollTop + (childRect.bottom - parentRect.bottom);
            }
        },
        [ref],
    );

    useEffect(() => {
        if (ref.current) {
            const imgDOM = document.getElementById(
                `img-preview-list-${scenes[page - 1].name}`,
            ) as HTMLImageElement;

            if (imgDOM) {
                scroll(imgDOM);
            }
        }
    }, [ref, page, scenes, scroll]);

    const activeItem = useCallback(
        (index: number): void => {
            setPage(index + 1);
        },
        [setPage],
    );

    return (
        <div className={previewListClassName(showPreviewList, !operable)} ref={ref}>
            {scenes.map((scene, index) => {
                const isActive = page - 1 === index;

                return (
                    <PreviewItem
                        name={scene.name}
                        src={scene.ppt.previewURL || scene.ppt.src}
                        index={index}
                        isActive={isActive}
                        activeItem={activeItem}
                        operable={operable}
                        key={scene.name}
                    />
                );
            })}
        </div>
    );
};

type PreviewItemProps = {
    name: string;
    src: string;
    index: number;
    isActive: boolean;
    activeItem: (index: number) => void;
    operable: boolean;
};

const PreviewItem: React.FunctionComponent<PreviewItemProps> = React.memo(function PreviewItem({
    name,
    src,
    index,
    isActive,
    activeItem,
    operable,
}: PreviewItemProps) {
    return (
        <div className={itemClassName(isActive)} onClick={() => operable && activeItem(index)}>
            <span>{index + 1}</span>
            <div>
                <Image src={src} domID={`img-preview-list-${name}`} />
            </div>
            <div />
        </div>
    );
});

const itemClassName = (active: boolean): string => {
    return classNames("item", {
        active,
    });
};

const previewListClassName = (show: boolean, isDisable: boolean): string => {
    return classNames("preview-list", {
        show,
        disable: isDisable,
    });
};
