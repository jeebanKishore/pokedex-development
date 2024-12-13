import React, { useContext, useMemo, useState, useEffect } from "react";
import Header from "../../components/header/header";
import "./home.scss";
import "../../styles/common.scss";
import PokemonCard from "../../components/pokemonCard/pokemonCard";
import Apploader from "../../components/loader/loader";
import PokemonContext from "../../context/pokemonContext/pokmon.context";
import DetailPage from "../details/details.page";
import { Button, Col, Row } from "rsuite";
import AppFilter from "../../components/filter/filter";

interface Pokemon {
  id: number;
  // Add other properties of the Pokemon object as needed
}

const HomePage: React.FC = () => {
  const [isCardSelected, setToggleSelect] = useState<boolean>(false);
  const [pokemonId, setPokemonId] = useState<number | undefined>(undefined);
  const [isFilterEnable, setIsFilterEnable] = useState<boolean>(false);

  const { state, getPokemonData } = useContext(PokemonContext);
  const { pokemonsList, isLoading, isLoadMoreInprogress } = state;

  // Fetch data on initial load
  useEffect(() => {
    if (pokemonsList.length === 0) {
      getPokemonData();
    }
  }, [pokemonsList.length, getPokemonData]);

  const pokemonsListView = useMemo(
    () =>
      pokemonsList.map((data: Pokemon) => (
        <div key={`pokemon-card-${data.id}`} className="responsive">
          <PokemonCard
            data={data}
            onClick={() => {
              setPokemonId(data.id);
              toggleModal();
            }}
          />
        </div>
      )),
    [pokemonsList]
  );

  const handleLoadMoreClick = () => {
    getPokemonData();
  };

  const toggleModal = () => {
    setToggleSelect((prevState) => !prevState);
  };

  const isFilterEnableHandler = (isEnable: boolean) => {
    setIsFilterEnable(isEnable);
  };

  return (
    <>
      <div className="home-container">
        <div>
          <Header className="header-container">
            <Row lg={24} xl={24} className="app-header-wrap show-grid">
              <Col xs={12} sm={12} lg={5} xl={5}>
                <div className="header-title">
                  <h3>Pokédex</h3>
                </div>
              </Col>
              <Col xs={12} sm={12} lg={2} xl={2} className="hide">
                <div className="header-horizontal-line" />
              </Col>
              <Col xs={24} sm={24} lg={20} xl={20}>
                <div className="subheading">
                  <span>Search for any Pokémon that exist on the planet</span>
                </div>
              </Col>
            </Row>
          </Header>
          <div>
            <AppFilter isFilterEnable={isFilterEnableHandler} />
          </div>
        </div>
        {pokemonsList.length > 0 && (
          <div>
            <div className="card-list">{pokemonsListView}</div>
            <div>
              {isLoadMoreInprogress && <Apploader className="loadmore-loader" />}
            </div>
            {!isFilterEnable && (
              <div className="load-more-wrap">
                <Button appearance="link" onClick={handleLoadMoreClick}>
                  Load more
                </Button>
              </div>
            )}
          </div>
        )}
        {!pokemonsList.length && (
          <div className="no-data-found">
            <span>No data found</span>
          </div>
        )}
        {isLoading && <Apploader className="app-loader-wrapper" />}
        <div>
          {isCardSelected && (
            <DetailPage
              isCardSelected={isCardSelected}
              toggleModal={toggleModal}
              pokemonId={pokemonId}
              offset={pokemonsList.length}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
