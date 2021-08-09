import React, { useEffect, useRef } from "react";
import { PluginContext } from "@netless/window-manager";
import { View, WhiteScene } from "white-web-sdk";
import { RecoilRoot } from "recoil";
import "./style.less";
import { PreviewList } from "../../components/previewList";
import { Footer } from "../../components/footer";
import { ResourceContent } from "../../components/resourceContent";

type DisplayContainerProps = {
    context: PluginContext;
    scenes: WhiteScene[];
    view: View;
    initScenePath: string;
};

const DisplayContainer: React.FunctionComponent<DisplayContainerProps> = ({
    scenes,
    context,
    view,
    initScenePath,
}: DisplayContainerProps) => {
    const resourceContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        context.emit("setBoxSize", {
            height: scenes[0].ppt!.height,
        });
    }, [scenes, context]);

    for (const scene of scenes) {
        if (!verifyScene(scene)) {
            context.emit("destroy", new Error("scenes format error!"));
            return <></>;
        }
    }

    return (
        <RecoilRoot>
            <div className="box">
                <div>
                    <PreviewList scenes={scenes as Array<Required<WhiteScene>>} />
                    <ResourceContent
                        scenes={scenes as Array<Required<WhiteScene>>}
                        view={view}
                        initScenePath={initScenePath}
                        context={context}
                        ref={resourceContentRef}
                    />
                </div>
                <Footer pageCount={scenes.length} />
            </div>
        </RecoilRoot>
    );
};

const verifyScene = (scene: WhiteScene): scene is Required<WhiteScene> => {
    return !!(scene.name && scene.ppt && scene.ppt.height && scene.ppt.width && scene.ppt.src);
};

type PluginComponentProps = {
    context: PluginContext;
    scenes: WhiteScene[];
    view: View;
    initScenePath: string;
};

export const PluginComponent: React.FunctionComponent<PluginComponentProps> = ({
    context,
    scenes,
    view,
    initScenePath,
}: PluginComponentProps) => {
    return (
        <RecoilRoot>
            <DisplayContainer
                scenes={scenes}
                context={context}
                view={view}
                initScenePath={initScenePath}
            />
        </RecoilRoot>
    );
};
