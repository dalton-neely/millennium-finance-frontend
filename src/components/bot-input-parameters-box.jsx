import React from "react";
import "./bot-input-parameters-box.css";
import {BotInputParametersSecurityBox} from "./bot-input-parameters-security-box";
import {BotInputParametersWeightsBox} from "./bot-input-parameters-weights-box";

export const BotInputParametersBox = props => {
    const {onRunSimulationCallback, weightsBoxRef} = props;

    return (
        <div id="bot-input-parameters-box">
            <BotInputParametersSecurityBox onRunSimulationCallback={onRunSimulationCallback}/>
            <BotInputParametersWeightsBox weightsBoxRef={weightsBoxRef}/>
        </div>
    );
};