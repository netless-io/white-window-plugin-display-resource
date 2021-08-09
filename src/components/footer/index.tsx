import React from "react";
import "./style.less";
import { Navigation } from "../navigation";
import { GotoPage } from "../gotoPage";
import { showPreviewListState } from "../../recoil/State";
import { useRecoilState } from "recoil";

type FooterProps = {
    pageCount: number;
};

export const Footer: React.FunctionComponent<FooterProps> = React.memo(function Footer({
    pageCount,
}: FooterProps) {
    const [showPreviewList, setShowPreviewList] = useRecoilState(showPreviewListState);

    const togglePreviewList = (): void => {
        setShowPreviewList(!showPreviewList);
    };

    return (
        <div className="footer">
            <div>
                <span onClick={togglePreviewList}>List</span>
            </div>
            <Navigation pageCount={pageCount} />
            <GotoPage pageCount={pageCount} />
        </div>
    );
});
