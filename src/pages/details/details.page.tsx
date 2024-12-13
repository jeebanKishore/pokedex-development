import "./details.page.scss";
import React, { useState, useEffect } from "react";
import { Loader, Modal, Placeholder } from "rsuite";
import { getPokemonDataById, getPokemonTypesById, getSpeciesDataById } from "../../services/common.service";
import DetailsHeader from "../../components/pokemonDetailsCard/detailsHeader/detailsHeader";
import PropertyCard from "../../components/pokemonDetailsCard/propertyCard/propertyCard";
import StatCard from "../../components/pokemonDetailsCard/statCard/statCard";
import EvolutionChainCard from "../../components/pokemonDetailsCard/evolutionChainCard/evolutionChainCard";

type DetailPageProps = {
    isCardSelected?: boolean,
    toggleModal?: any,
    pokemonId?: number,
    offset?: number
};
const DetailPage: React.FC<DetailPageProps> = ({ isCardSelected, toggleModal, pokemonId, offset }) => {
    const [currentPokemonId, setCurrentPokemonId] = useState<number| undefined>(pokemonId);
    const handleClose = () => toggleModal();

    // Define the interface according to your data structure
    interface PokemonData {
        stats?: Array<any>;  // Replace with the actual structure
        // Other properties
    }

    const [data, setPokemonData] = useState<PokemonData | undefined>(undefined);
    const [isDetailLoading, setLoading] = useState(true);
    const [isModalOpen, setCloseModal] = useState(isCardSelected);
    const [pokemonSpeciesData, setPokemonSpeciesData] = useState<any | undefined>(undefined);
    const [pokemonTypeData, setPokemonTypeData] = useState<any | undefined>(undefined);
    useEffect(
        () => {
            if (!currentPokemonId) return;
            (async function setPokemonDetails() {
                setLoading(true);
                const response = await getPokemonDataById(currentPokemonId);
                setPokemonData(response);
                setLoading(false);
                const speciesData = await getSpeciesDataById(currentPokemonId);
                setPokemonSpeciesData(speciesData);
                const typeData = await getPokemonTypesById(currentPokemonId);
                setPokemonTypeData(typeData);
            })();
        },
        [currentPokemonId]
    );
    const handleForwordClick = () => {
        if (currentPokemonId === undefined || currentPokemonId === offset) return;
        setCurrentPokemonId(currentPokemonId + 1);
    };
    const handleBackwordClick = () => {
        if (currentPokemonId === undefined || currentPokemonId === 1) return;
        setCurrentPokemonId(currentPokemonId - 1);
    };
    const closePopUp = () => {
        setCloseModal(false);
    };
    return (
        <>
            <Modal
                dialogClassName={"details-modal-container"}
                size={"md"}
                open={isModalOpen}
                onClose={handleClose}
                onExited={() => {
                    setPokemonData(undefined);
                }}
            >
                {data ? (
                    <>
                        <div className="model-container">
                            <Modal.Header closeButton={false} className="rs-modal-header-2">
                                {isDetailLoading && <Placeholder.Paragraph style={{ marginTop: 30 }} rows={5} graph="image" active />}
                                {!isDetailLoading && (
                                    <div>
                                        <DetailsHeader data={data} speciesData={pokemonSpeciesData} 
                                            forwordClick={handleForwordClick} backClick={handleBackwordClick} 
                                            closeClick={closePopUp} />
                                    </div>
                                )}
                                <div className="padding-components">{pokemonTypeData && <PropertyCard 
                                    speciesData={pokemonSpeciesData} data={data} pokemonTypeData={pokemonTypeData} />}</div>
                                <div className="padding-components">{data?.stats && <StatCard stats={data.stats} />}</div>
                                <div className="padding-components">
                                    <EvolutionChainCard data={data} />
                                </div>
                            </Modal.Header>
                            <Modal.Body />
                        </div>
                    </>
                ) : (
                    <div style={{ textAlign: "center" }}>
                        <Loader size="md" />
                    </div>
                )}
            </Modal>
        </>
    );
};

export default DetailPage;
