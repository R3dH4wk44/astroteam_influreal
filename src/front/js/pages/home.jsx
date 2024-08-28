import React, { useContext, useState } from "react";
import { Search } from "../component/search.jsx";
import FloatingButton from "../component/floatingButton.jsx";
import InfluencerCard from "../component/influencerCard.jsx";
import { Context } from "../store/appContext.js";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import Select from 'react-select'

import "../../styles/tailwind.css";
import "../../styles/index.css";
import "../../styles/homeMaria.css";

const Home = () => {
  const { store, actions } = useContext(Context);
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    seguidores: 0,
    engagement: 0,
    redSocial: "",
    categoria: [],
    estiloDeVida: "",
    edadObjetivo: [],
    paisesObjetivo: [],
    sexo: "",
  });

  const [showMoreFilters, setShowMoreFilters] = useState(false); // Definición de showMoreFilters

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleFilterChange = (event) => {
    const { name, value } = event;
    if (
      name === "categoria" ||
      name === "edadObjetivo" ||
      name === "paisesObjetivo"
    ) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value.map((option) => option.value),
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  const clearAllFilters = () => {
    const initialFilters = {
      seguidores: 0,
      engagement: 0,
      redSocial: "",
      categoria: [],
      estiloDeVida: "",
      edadObjetivo: [],
      paisesObjetivo: [],
      sexo: "",
    };
    setFilters(initialFilters);
    actions.clearFilters();
  };

  const filteredInfluencers = store.filteredInfluencers.filter(
    (influencer) =>
      influencer.nombre.toLowerCase().includes(searchQuery) &&
      influencer.seguidoresInstagram >= filters.seguidores &&
      influencer.erInstagram >= filters.engagement &&
      (filters.redSocial === "" ||
        influencer.redSocial === filters.redSocial) &&
      (filters.categoria.length === 0 ||
        filters.categoria.includes(influencer.categoria)) &&
      (filters.edadObjetivo.length === 0 ||
        filters.edadObjetivo.includes(influencer.edadObjetivo)) &&
      (filters.paisesObjetivo.length === 0 ||
        filters.paisesObjetivo.includes(influencer.paisObjetivo)) &&
      (filters.sexo === "" || influencer.sexo === filters.sexo)
  );

  const toggleInfluencerFromList = async (id) => {
    if (store.singleList) {
      const isInList = store.singleList.influencers.some(
        (influencer_id) => influencer_id === id
      );

      try {
        if (isInList) {
          await actions.removeInfluencerFromLista(store.singleList.id, id);
        } else {
          await actions.addInfluencerToLista(store.singleList.id, id);
        }
      } catch (error) {
        console.error("Error al añadir o eliminar influencer:", error);
      }
    } else {
      console.error("No hay ninguna lista seleccionada.");
    }
  };

  const influencerIsLiked = (id) => {
    return store.singleList?.influencers.some(
      (influencer_id) => influencer_id === id
    );
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num;
  };

  if (!store.filteredInfluencers) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Search onSearch={handleSearch} />
      <div className="containerTotal mx-auto p-2 pt-3 md:p-3 lg:p-6">
        <div className="container mx-auto mb-3 p-1 pt-2 md:p-2 lg:p-4">
          <div className="flex justify-between items-center mb-4">
            <a href="#" className="font-semibold text-sm">
              Filtros populares
            </a>
          </div>

          <div className="overflow-x-auto">
            <div className="flex flex-nowrap">
              <div className="filter-item flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/4 flex flex-col p-2 mb-2">
                <label className="filter-label">Red</label>
                <select
                  className="filter-select"
                  name="redSocial"
                  onChange={handleFilterChange}
                >
                  <option value="">Todas</option>
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                </select>
              </div>

                            <div className="filter-item w-full" style={{ position: 'relative', zIndex: 1000 }}>
                
  <label className="filter-label">Categoría</label>
  <Select
    isMulti
    name="categoria"
    value={filters.categoria.map((value) => ({
      value,
      label: value,
    }))}
    onChange={(value) => handleFilterChange({ name: "categoria", value })}
    options={[
            { value: "lifestyle", label: "Lifestyle" },
            { value: "marketing", label: "Marketing" },
            { value: "negocios", label: "Negocios" },
            { value: "emprendimiento", label: "Emprendimiento" },
            { value: "viajes", label: "Viajes" },
            { value: "comida", label: "Comida" },
            { value: "belleza", label: "Belleza" },
            { value: "salud", label: "Salud" },
            { value: "fitness", label: "Fitness" },
            { value: "moda", label: "Moda" },
            { value: "automoviles", label: "Automóviles" },
            { value: "tecnologia", label: "Tecnología" },
            { value: "finanzas", label: "Finanzas" },
            { value: "educacion", label: "Educación" },
            { value: "maternidad", label: "Maternidad" },
            { value: "medioAmbienteYSostenibilidad", label: "Medio ambiente y sostenibilidad" },
            { value: "animales", label: "Animales" },
            { value: "entretenimiento", label: "Entretenimiento" },
            { value: "libros", label: "Libros" },
            { value: "musica", label: "Música" },
            { value: "politica", label: "Política" },
            { value: "actualidad", label: "Actualidad" },
            { value: "otros", label: "Otros" },
            
          ]}
          styles={{
            menu: (provided) => ({
              ...provided,
              zIndex: 10000,
            }),
          }}
          menuPortalTarget={document.body} 
        />
      </div>
               
  
      <div className="filter-item w-full">
  <label className="filter-label">Países de alcance</label>
  <Select
    isMulti
    name="paisesObjetivo"
    value={filters.paisesObjetivo.map((value) => ({
      value,
      label: value,
    }))}
    onChange={(value) => handleFilterChange({ name: "paisesObjetivo", value })}
    options={[
            { value: "España", label: "España" },
            { value: "México", label: "México" },
            { value: "Argentina", label: "Argentina" },
            { value: "Bolivia", label: "Bolivia" },
            { value: "Chile", label: "Chile" },
            { value: "Colombia", label: "Colombia" },
            { value: "Costa Rica", label: "Costa Rica" },
            { value: "Cuba", label: "Cuba" },
            { value: "Ecuador", label: "Ecuador" },
            { value: "El Salvador", label: "El Salvador" },
            { value: "Guatemala", label: "Guatemala" },
            { value: "Honduras", label: "Honduras" },
            { value: "Nicaragua", label: "Nicaragua" },
            { value: "Panamá", label: "Panamá" },
            { value: "Perú", label: "Perú" },
            { value: "República Dominicana", label: "República Dominicana" },
            { value: "Uruguay", label: "Uruguay" },
            { value: "Venezuela", label: "Venezuela" },
            { value: "Otro", label: "Otro" },
           
          ]}
          styles={{
            menu: (provided) => ({
              ...provided,
              zIndex: 10000,
            }),
          }}
          menuPortalTarget={document.body} 
        />
      </div>



 


            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3">
            <button
              className="show-more-button boton-filtros text-white w-full md:w-auto"
              onClick={() => setShowMoreFilters(!showMoreFilters)}
            >
              {showMoreFilters
                ? "Mostrar menos filtros"
                : "Mostrar más filtros"}
            </button>
          </div>
          <a href="#" className="text-accent-two text-sm" onClick={clearAllFilters}>
          Borrar filtros
        </a>

          {showMoreFilters && (
            <div className={`slide-up-menu ${showMoreFilters ? "open" : ""}`}>
               <div className="filter-item w-full">
  <label className="filter-label">Edad público objetivo</label>
  <Select
    isMulti
    name="edadObjetivo"
    value={filters.edadObjetivo.map((value) => ({
      value,
      label: value,
    }))}
    onChange={(value) => handleFilterChange({ name: "edadObjetivo", value })}
    options={[
            { value: "0-3", label: "Hasta 3 años" },
            { value: "3-12", label: "3 a 12 años" },
            { value: "12-18", label: "12 a 18 años" },
            { value: "18-25", label: "18 a 25 años" },
            { value: "25-35", label: "25 a 35 años" },
            { value: "35-45", label: "35 a 45 años" },
            { value: "45-55", label: "45 a 55 años" },
            { value: "+55", label: "+55 años" },
          ]}
        />
      </div>

              <div className="filter-item w-full">
                <label className="filter-label">Engagement</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    className="filter-range"
                    name="engagement"
                    value={filters.engagement}
                    onChange={handleFilterChange}
                  />
                  <span className="ml-2 filter-range-value">
                    {formatNumber(filters.engagement)}
                  </span>
                </div>
              </div>

              <div className="filter-item  w-full">
                <label className="filter-label">Nº de seguidores</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="30000"
                    className="filter-range"
                    name="seguidores"
                    value={filters.seguidores}
                    onChange={handleFilterChange}
                  />
                  <span className="ml-2 filter-range-value">
                    {formatNumber(filters.seguidores)}
                  </span>
                </div>
              </div>

              <div className="filter-item flex-shrink-0 w-full md:w-1/2 lg:w-1/4 flex flex-col p-2 mb-2">
                <label className="filter-label">Sexo al que se dirige</label>
                <select
                  className="filter-select"
                  name="sexo"
                  onChange={handleFilterChange}
                >
                  <option value="">Todos</option>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                </select>
              </div>

            
              <div className="w-full mt-4 flex justify-center">
                <button
                  className="close-menu-button boton-filtros text-white"
                  onClick={() => setShowMoreFilters(false)}
                >
                  Aplicar
                </button>
              </div>
            </div>
          )}

          {showMoreFilters && (
            <div
              className="overlay"
              onClick={() => setShowMoreFilters(false)}
            />
          )}

          <div className="mb-4">
            <span className="block text-sm font-semibold">
              {store.singleList
                ? store.singleList.nombre
                : "Ninguna lista seleccionada"}
            </span>
            <span className="block text-sm">
              {filteredInfluencers.length} influencers mostrados
            </span>
            <button className="text-sm">mostrar todos</button>
            <button className="text-sm text-accent-two ml-2">
              mostrar solo seleccionados
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(filteredInfluencers) &&
              filteredInfluencers.map((influencer) => (
                <InfluencerCard
                  key={influencer.id}
                  imagen={influencer.imagen || ""}
                  usuario={influencer.nombre || ""}
                  erInstagram={influencer.erInstagram || 1}
                  seguidoresInstagram={influencer.seguidoresInstagram || 1}
                  erTiktok={influencer.erTiktok || 1}
                  seguidoresTiktok={influencer.seguidoresTiktok || 1}
                  isLiked={() => influencerIsLiked(influencer.id)}
                  onClick={() => actions.selectInfluencer(influencer.id)}
                  selectInfluencer={() => {
                    toggleInfluencerFromList(influencer.id);
                  }}
                  id={influencer.id}
                />
              ))}
          </div>
        </div>
      </div>
      <FloatingButton />
    </>
  );
};

export default Home;
