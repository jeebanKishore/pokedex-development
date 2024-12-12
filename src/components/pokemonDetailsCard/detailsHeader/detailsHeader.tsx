/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import PokemonCard from "../../pokemonCard/pokemonCard";
import AppTooltip from "../../../hooks/tooltip/tooltip";
import backIcon from "../../../assets/icons/back-icon.png";
import closeIcon from "../../../assets/icons/close-icon.png";
import rightIcon from "../../../assets/icons/right-icon.png";
import { numberFormation } from "../../../services/common.service";
import { getPokemonDescription } from "../../../constants/pokemon.types";
import "./detailsHeader.scss";
import "../../../styles/common.scss";
type DetailsHeaderProps = {
    data?: object,
    speciesData?: object,
    backClick?: (...args: any[]) => any,
    closeClick?: (...args: any[]) => any,
    forwordClick?: (...args: any[]) => any
};
const DetailsHeader: React.FC<DetailsHeaderProps> = ({ data, speciesData, ...props }) => {
    const getPokemonDescriptions = () => {
        if (speciesData && speciesData.flavor_text_entries) {
            return getPokemonDescription(speciesData.flavor_text_entries);
        } else {
            return "";
        }
    };
    return (
        <>
            <div className="details-header-container">
                <div className="header-wrap">
                    <div>
                        <PokemonCard className="disabled-click" key={data.id} data={data} />
                    </div>
                    <div className="header-sub-wrap pl-3">
                        <div className="title-wrap">
                            <div>
                                <h3 className="text-caps">{data.name}</h3>
                            </div>
                            <div className="horizontal-line" />
                            <div>
                                <h3>{numberFormation(data.id)}</h3>
                            </div>
                            <div className="horizontal-line" />
                            <div>
                                <div className="icon-wrap">
                                    <img src={backIcon} alt="back icon to go backword" onClick={props.backClick} onKeyDown={() => {}} role="presentation" />
                                    <img src={closeIcon} alt="close icon to go backword" onClick={props.closeClick} onKeyDown={() => {}} role="presentation" />
                                    <img src={rightIcon} alt="forword icon to go backword" onClick={props.forwordClick} onKeyDown={() => {}} role="presentation" />
                                </div>
                            </div>
                        </div>
                        <div className="text-description">
                            <div className="text-dot">
                                <span>{getPokemonDescriptions().substring(0, 363)} </span>
                            </div>
                            <div className="text-dot">... </div>
                            {getPokemonDescriptions().length > 363 && <AppTooltip placement="bottom" className="load-more" tooltipClass="tooltip-popover" name="read more" data={getPokemonDescriptions()} appearance="subtle" />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default DetailsHeader;
