use App\LigneFacture;
<template>
    <v-btn color="success" @click="submit">Save</v-btn>
</template>

<script>
export default {
  props: ["url"],
  data() {
    return {
      facture: {
        reference: "FACT-TEST",
        statut: "En cours",
        reglement: "cheque",
        date_emission: new Date(),
        date_echeance: new Date(),
        client_id: 1,
        total_ht: 100,
        total_tva: 20,
        total_ttc: 120,
        total_remise: 11,
        lignes: [
          {
            produit_id: 5,
            qte: 10,
            remise: 0
          },
          {
            produit_id: 1,
            qte: 6,
            remise: 4
          },
          {
            produit_id: 3,
            qte: 2,
            remise: 7
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      let uri = this.url + "/api/facturation/create";
      this.axios
        .post(uri, this.facture)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
