import styles from "./CreatiEveniment.module.scss";

const CreatiEveniment = ({ data }) => {
  console.log(data);
  return (
    <div>
      {data.map((petrecere, index) => (
        <div key={index}>
          <h1>{petrecere.locatieeveniment}</h1>

          <h1>{petrecere.nrcontact}</h1>
          <h1>{petrecere.oraConfirmata}</h1>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/rezervari/confirmate");
  const data = await res.json();
  return { props: { data } };
}

export default CreatiEveniment;
