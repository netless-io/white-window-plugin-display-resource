import React, { MutableRefObject, useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Room, SceneState, View, WhiteScene } from "white-web-sdk";
import {
    navigationActionState,
    operableState,
    pageNumberState,
    resourceTypeState,
} from "../../recoil/State";
import "./style.less";
import { PluginContext } from "@netless/window-manager";
import "@netless/window-manager/dist/style.css";

type ResourceContentProps = {
    scenes: Array<Required<WhiteScene>>;
    context: PluginContext;
    initScenePath: string;
    view: View;
};

export const ResourceContent = React.forwardRef<HTMLDivElement, ResourceContentProps>(
    function ResourceContent({ scenes, context, initScenePath, view }, ref) {
        const [page, setPage] = useRecoilState(pageNumberState);
        const [operable, setOperable] = useRecoilState(operableState);
        const navigationAction = useRecoilValue(navigationActionState);
        const setResourceType = useSetRecoilState(resourceTypeState);
        const [showWhiteboard, setShowWhiteboard] = useState(false);

        useEffect(() => {
            setResourceType(scenes[0].ppt?.previewURL ? "dynamic" : "static");
        }, [scenes, setResourceType]);

        useEffect(() => {
            setOperable(context.isWritable);

            const onWritableChange = (isWritable: boolean): void => {
                setOperable(isWritable);
            };

            context.on("writableChange", onWritableChange);

            return () => {
                context.off("writableChange", onWritableChange);
            };
        }, [context, setOperable, view]);

        useEffect(() => {
            const myRef = ref as MutableRefObject<HTMLDivElement>;

            if (myRef.current && showWhiteboard) {
                view.divElement = myRef.current;
            }
        }, [ref, view, showWhiteboard]);

        const changePage = useCallback(
            page => {
                if (operable) {
                    view.focusScenePath = `${initScenePath}/${scenes[page - 1].name}`;
                    context.setScenePath(view.focusScenePath);
                }

                setShowWhiteboard(true);
            },
            [operable, view, initScenePath, scenes, context],
        );

        useEffect(() => {
            changePage(page);
        }, [page, changePage]);

        useEffect(() => {
            const room = context.displayer as Room;

            setPage(room.state.sceneState.index + 1);

            const onSceneStateChange = (sceneState: SceneState): void => {
                setPage(sceneState.index + 1);
            };

            context.on("sceneStateChange", onSceneStateChange);

            return () => {
                context.off("sceneStateChange", onSceneStateChange);
            };
        }, [context, setPage]);

        useEffect(() => {
            if (navigationAction === null) {
                return;
            }

            if (navigationAction.action === "next") {
                context.pptNextStep();
            } else {
                context.pptPreviousStep();
            }
        }, [context, navigationAction]);

        return <div className="content" ref={ref}></div>;
    },
);
