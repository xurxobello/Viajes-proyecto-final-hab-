import useRecommendations from "../hooks/useRecommendations";
import RecommendationsList from "./RecommendationsList";

export const UserRecommendations = ({ id }) => {
  const { recommendations, loading, error } = useRecommendations(id);
  const style = {
    marginTop: "20px",
  };

  // indicamos que mientras carga nos devuelva un mensaje indicándolo
  if (loading) return <p>Cargando recomendaciones...</p>;

  // indicamos que si hay un error nos devuelva el error
  if (error) return <p>{error}</p>;

  // en caso de que no esté cargando ni de un error indicamos que nos de la lista de recomendaciones llamando al componente RecommendationsList
  return (
    <>
      <section>
        <h2 style={style}>Your recommendations</h2>
        <RecommendationsList recommendations={recommendations} />
      </section>
    </>
  );
};
