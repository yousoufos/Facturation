<template>
<v-container grid-list-md>
    <v-layout row wrap v-if="loading">
        <v-flex xs12 class="text-xs-center">
           <v-progress-circular indeterminate color="primary">
            </v-progress-circular>
        </v-flex>
    </v-layout>
    <div v-else>
	<v-layout row wrap>
		<v-flex xs12>
			<v-btn  @click="test">text</v-btn>
		</v-flex>
	</v-layout>
	<v-layout row justify-space-between>
		<v-flex xs12 md6>
			<v-card>
				<v-card-text>
				   <p>{{ client.nom }}</p>
				   <p>{{ client.raison }}</p>
				   <p>{{ client.adresse }}</p>
				   <p>TVA: {{ client.matricule }}</p>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
	<v-layout row wrap>
		<v-flex xs3 d-flex>
			<v-text-field
				label="Date"
                v-model="date_emission"
                readonly
			></v-text-field>
		</v-flex>
		<v-flex xs3>
			<v-text-field
				label="Date Echéance"
                v-model="date_echeance"
                readonly
			></v-text-field>
		</v-flex>
		<v-flex xs3>
			<v-text-field
				label="Reference Facture"
                v-model="reference"
                readonly
			></v-text-field>
		</v-flex>
		<v-flex xs3>
			<v-text-field
				label="Code Client"
                v-model="code_client"
                readonly
			></v-text-field>
		</v-flex>
	</v-layout>
	<v-layout row wrap>
		<v-flex xs12 mt-5>
			<v-data-table
				:headers="headers"
				:items="facture.lignes"
				hide-actions
				class="elevation-1"
				item-key="id"
			>
			<template
			slot="items"
			slot-scope="props"
		  >
			<td>{{ props.item.name }}</td>
			<td class="text-xs-left">{{ $store.getters.getProduitById(+props.item.produit_id).code }}</td>
			<td class="text-xs-left">{{ $store.getters.getProduitById(+props.item.produit_id).designation }}</td>
			<td class="text-xs-left">{{ props.item.qte }}</td>
			<td class="text-xs-left">{{ $store.getters.getProduitById(+props.item.produit_id).tva }}</td>
			<td class="text-xs-left">{{ $store.getters.getProduitById(+props.item.produit_id).prix }}</td>
			<td class="text-xs-left">{{ props.item.remise }}</td>
			<td class="text-xs-left">{{ total_ht_ligne(props.item) }}</td>
		  </template>
		  <template slot="footer">
			  <td :colspan="headers.length">
				<v-layout row wrap mt-2>
					<v-flex xs8>
						<v-data-table
							:headers="headers1"
							:items="reglements"
							class="elevation-1"
							item-key="id"
							hide-actions
						>
						<template
							slot="items"
							slot-scope="props"
						>
							<td>{{ props.item.name }}</td>
							<td class="text-xs-left">{{ props.item.mode_reglement }}</td>
							<td class="text-xs-left">{{ props.item.montant }}</td>
							<td class="text-xs-left">{{ props.item.date_reglement }}</td>
						</template>
						<template slot="footer">
							<td :colspan="headers1.length">
								<v-layout row wrap>
									<v-flex xs9>

									</v-flex>
									<v-flex xs3>
										<v-text-field
											class="inputPrice"
											type="number"
											readonly
											label="Reste à Payer"
											v-model="reste"
										>
										</v-text-field>
									</v-flex>
								</v-layout>
							</td>
						</template>
						</v-data-table>
					</v-flex>
					<v-flex xs1>
						<v-btn
							fab
							dark
							small
							color="indigo"
							>
						<v-icon dark>add</v-icon>
						</v-btn>
					</v-flex>
					<v-flex xs3>
						<v-layout row wrap >
				  <v-flex xs12>
					<v-text-field
					  class="inputPrice"
					  type="number"
					  readonly
					  label="Total Remise"
					  v-model="total_remise"

					></v-text-field>
				  </v-flex>
				  <v-flex
					xs12
				  >
					<v-text-field
					  class="inputPrice"
					  type="number"
					  readonly
					  label="Total Tva"
					  v-model="total_tva"

					></v-text-field>
				  </v-flex>
				  <v-flex
					xs12
				  >
					<v-text-field
					  class="inputPrice"
					  type="number"
					  readonly
					  label="Total HT"
					  v-model="total_ht"

					></v-text-field>
				  </v-flex>
				  <v-flex
					xs12
				  >
					<v-text-field
					  outline
					  class="inputPrice is-bold "
					  type="number"
					  readonly
					  label="Total TTC"
					  v-model="total_ttc"

					></v-text-field>
				  </v-flex>
				</v-layout>
					</v-flex>
				</v-layout>
			  </td>
			</template>
			</v-data-table>
		</v-flex>
	</v-layout>
    </div>
</v-container>
</template>

<script>
var moment = require('moment');
export default {
	data(){
		return{
			 headers: [
		{
		  align: "left",
		  sortable: false,
		  value: "name"
		},
		{ text: "Code", value: "code" },
		{ text: "Designation", value: "designation" },
		{ text: "Qte", value: "qte" },
		{ text: "TVA %", value: "tva" },
		{ text: "Prix Unitaire", value: "prix" },
		{ text: "Total Remise", value: "remise" },
		{ text: "Total HT (apres remise)", value: "total_HT" },
	  ],
	  items1:[],
	  headers1: [
		{
		  align: "left",
		  sortable: false,
		  value: "name"
		},
		{ text: "Mode Reglement", value: "mode_reglement" },
		{ text: "Montant", value: "montant" },
		{ text: "Date", value: "date_reglement" },
      ],

		}
    },

	methods:{

		test(){
			this.total_reglement()

        },
        total_ht_ligne (item) {
      let prix = this.$store.getters.getProduitById(+item.produit_id).prix;
      let qte = item.qte
      let remise = item.remise
      return (prix * qte ) - remise;
    },
        total_reglement(){
                    let sum=0
                    const obj = this.reglements;
                    Object.keys(obj).forEach((key) => {
                        const value = obj[key];
                        sum+=eval(value.montant)
                    })
                    return sum
    },
    },
	computed:{
        facture(){
            return this.$store.getters.getFacture(+this.$route.params.factureId)
        },
        loading(){
            return this.$store.getters.loading
        },
        total_ttc(){
            return this.facture.total_ttc
        },
        total_ht(){
            return this.facture.total_ht
        },
        total_remise(){
            return this.facture.total_remise
        },
        total_tva(){
            return this.facture.total_tva
        },

        date_emission(){
            return moment(this.facture.date_emission).format('L')
        },
        date_echeance(){
            return moment(this.facture.date_echeance).format('L')
        },
        reference(){
            return this.facture.reference
        },
        code_client(){
            return this.facture.client_id
        },
        reste(){
            return this.facture.total_ttc - this.total_reglement()
        },
        client(){

            return this.$store.getters.getClient(+this.facture.client_id)
        },
        reglements(){
            return this.$store.getters.getReglementFactureById((this.$route.params.factureId).toString())
        },
	}
}
</script>

<style>

</style>
