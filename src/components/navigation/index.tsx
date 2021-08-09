import React, { useCallback } from "react";
import classNames from "classnames";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    navigationActionState,
    operableState,
    pageNumberState,
    resourceTypeState,
} from "../../recoil/State";
import "./style.less";

type NavigationProps = {
    pageCount: number;
};

export const Navigation: React.FunctionComponent<NavigationProps> = React.memo(function Navigation({
    pageCount,
}: NavigationProps) {
    const operable = useRecoilValue(operableState);
    const page = useRecoilValue(pageNumberState);
    const resourceType = useRecoilValue(resourceTypeState);
    const setNavigationAction = useSetRecoilState(navigationActionState);

    const isBegin = useCallback(() => {
        return page === 1;
    }, [page]);

    const isEnd = useCallback(() => {
        return page === pageCount;
    }, [page, pageCount]);

    const isDisable = useCallback(
        (behavior: "prev" | "next") => {
            if (!operable) {
                return true;
            }

            return resourceType === "static" && behavior === "prev" ? isBegin() : isEnd();
        },
        [isBegin, isEnd, operable, resourceType],
    );

    const navigation = useCallback(
        (behavior: "prev" | "next") => () => {
            if (isDisable(behavior)) {
                return;
            }

            setNavigationAction({
                action: behavior,
            });
        },
        [isDisable, setNavigationAction],
    );

    const navigationButtonClassNames = useCallback(
        (behavior: "prev" | "next") => {
            return classNames({
                disable: isDisable(behavior),
            });
        },
        [isDisable],
    );

    return (
        <div className="navigation">
            <div className="item">
                <span className={navigationButtonClassNames("prev")} onClick={navigation("prev")}>
                    ←
                </span>
            </div>
            <div className="item">
                <span className={navigationButtonClassNames("next")} onClick={navigation("next")}>
                    →
                </span>
            </div>
        </div>
    );
});
