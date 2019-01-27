<template>
<v-container grid-list-md>
<navigation></navigation>
    <v-layout row wrap v-if="loading">
        <v-flex xs12 class="text-xs-center">
           <v-progress-circular indeterminate color="primary">
            </v-progress-circular>
        </v-flex>
    </v-layout>
    <div v-else>
        <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>

        <v-card-title>
          <span class="headline">Ajout Reglement</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-select
          :items="modeReglementTab "
          label="Mode Reglement"
          v-model="mode_reglement"
        ></v-select>
        <v-alert
          :value="validation_mode_reglement"
          type="error"
          dismissible
          @click="clearErrors"
        >
          Le mode de regelemnt doit etre indiqué
        </v-alert>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Montant" v-model="montant_reglement" >{{ reste }}</v-text-field>
                <v-alert
          :value="validation_montant_reglement"
          type="error"
          dismissible
          @click="clearErrors"
        >
          Le montant est erroné
        </v-alert>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <date
                    :date_reglement="'Date Reglement'"
                    ref="datereglement"
                    ></date>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="addReglement">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
	<v-layout row justify-space-between>
        <v-flex xs12>
            <v-btn block color="success" @click="generatePdf">Pdf</v-btn>
        </v-flex>
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
			<td class="text-xs-right">{{ total_ht_ligne(props.item) }}</td>

		  </template>
		  <template slot="footer">
			  <td :colspan="headers.length">
				<v-layout row wrap mt-5>
					<v-flex xs9>
						<v-data-table
							:headers="headers1"
							:items="reglements"
                            :loading="loadingTable"
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
                            <td class="justify-center layout px-0">
                <v-icon
                  small
                  @click="deleteItem(props.item)"
                >delete</v-icon>
              </td>
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
                                            :class="getStatutClass()"
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
                            :disabled="reste===0?true:false"
							color="indigo"
                            @click="showDialog"
							>
						<v-icon dark>add</v-icon>
						</v-btn>
					</v-flex>
					<v-flex xs2>
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
var writtenForm = require('written-number')
writtenForm.defaults.lang = 'fr'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
export default {

	data(){
		return{
            dialog: false,
           modeReglementTab:['espece','cheque','CB'],
           mode_reglement:null,
           montant_reglement:0,
           validation_mode_reglement:false,
           validation_montant_reglement:false,
           validation_date_reglement:false,
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
        { text: "Actions", value: "name", sortable: false }
      ],

		}
    },
	methods:{
        getStatutClass(){
          if(this.reste != undefined && this.reste > 0){
              return 'light-blue lighten-1'
          }
          if(this.reste != undefined && this.reste === 0){
              return 'teal lighten-1'
          }

      },
        clearErrors(){
            this.validation_mode_reglement =false
            this.validation_montant_reglement = false
            this.validation_date_reglement = false
        },

		test(){
			console.log(this.reglements);


        },
        deleteItem(item){
            let a={
                id:item.id,
                index:item
            }
            const index = this.reglements.indexOf(item)
      		let response = confirm('Etes vous sur de vouloir supprimer cette ligne')
      		if (response) {
                  this.$store.dispatch('deleteReglement',a)

              }



        },
        addReglement(){
            this.validation_mode_reglement = this.mode_reglement === null ? true : false
            this.validation_montant_reglement = (this.montant_reglement === null && this.montant_reglement<0 && this.montant_reglement >this.reste ) ? true : false
            this.validation_date_reglement = moment(this.$refs['datereglement'].date) < moment(this.facture.date_emission) ? true : false
            if(this.validation_mode_reglement === false && this.validation_montant_reglement === false && this.validation_date_reglement === false)
            {
                let r = {
                mode_reglement : this.mode_reglement,
                montant : this.montant_reglement,
                date_reglement : this.$refs["datereglement"].computedDateFormatted,
                facture_id : (this.facture.id).toString(),
            }
            this.$store.dispatch('saveReglement',r)
            this.dialog = false
            }


        },
        showDialog(){
            this.montant_reglement = this.reste
            this.dialog = true
        },
        total_ht_ligne (item) {
      let prix = this.$store.getters.getProduitById(+item.produit_id).prix;
      let qte = item.qte
      let remise = item.remise
      return ((prix * qte ) - remise).toFixed(3);
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
    generatePdf(){
        let i = 10
        let body =[]
        let head =['Code','Designation','Qte','Tva%','Prix Unitaire','Remise','Total HT']
        const obj = this.facture.lignes;
        Object.keys(obj).forEach((key) => {
                        const value = obj[key];
                        let b1=[]
                        b1.push(this.$store.getters.getProduitById(+value.produit_id).code,this.$store.getters.getProduitById(+value.produit_id).designation,value.qte,this.$store.getters.getProduitById(+value.produit_id).tva,this.$store.getters.getProduitById(+value.produit_id).prix,value.remise,this.total_ht_ligne(value))
                        body.push(b1)

        })

        var doc = new jsPDF();
        doc.setFontSize(12)
        doc.rect(10,10,75,40,'S')
        doc.text('Client: '+this.client.nom,12,15)
        doc.setFontSize(10)
        doc.text('Raison: '+this.client.raison,12,22)
        doc.text('Adresse: '+this.client.adresse,12,29)
        doc.text('TVA: '+this.client.matricule,12,40)
        doc.autoTable({
            head:[['Date emission:','Date echéance:','Reference Facture:','Code Client:']],
            body:[[this.date_emission,this.date_echeance,this.reference,this.code_client]],
            theme:'plain',
            startY:65,
        })
        doc.autoTable({
        head: [head],
        body: body,
        startY:80
    });
    doc.setLineWidth(0.5)
    doc.setDrawColor(0, 0, 0)
    doc.line(10, doc.autoTable.previous.finalY + 5+i, 200, doc.autoTable.previous.finalY+5+i)
    var s = this.total_ttc.split('.')
    doc.text('Total Remise: '+this.total_remise, 150, doc.autoTable.previous.finalY + 10+i);
    doc.text('Total Tva: '+this.total_tva, 150, doc.autoTable.previous.finalY + 20+i);
    doc.text('Total Tva: '+this.total_ht, 150, doc.autoTable.previous.finalY + 30+i);
    doc.text('Total TTC: '+this.total_ttc, 150, doc.autoTable.previous.finalY + 40+i);
    doc.text('Arreter la presente facture à la somme de: '+writtenForm(s[0])+ ' dinars '+(s.length>1 ? 'et '+writtenForm(s[1])+' millimes' : ''), 10, doc.autoTable.previous.finalY + 50+i);
    didDrawPage: (HookData) => {}




        doc.output("dataurlnewwindow");
        //doc.save('a4.pdf')
    }
    },
    watch:{
        reste(val){
            let fact = this.facture
            if(!this.loading){
                if(val === 0){
                fact.statut = 'Close'
                this.$store.dispatch('changeStatut',fact)
            }else {
                fact.statut = 'En cours'
                this.$store.dispatch('changeStatut',fact)
            }
            }

        }
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
            return moment(this.facture.date_emission).format("DD-MM-YYYY")
        },
        date_echeance(){
            return moment(this.facture.date_echeance).format("DD-MM-YYYY")
        },
        reference(){
            return this.facture.reference
        },
        code_client(){
            return this.facture.client_id
        },
        reste(){
            if(this.facture != undefined){
                return (this.facture.total_ttc - this.total_reglement()).toFixed(3)
            }
            else{
                return null
            }

        },
        client(){

            return this.$store.getters.getClient(+this.facture.client_id)
        },
        reglements(){
            return this.$store.getters.getReglementFactureById((this.$route.params.factureId).toString())
        },
        loadingTable(){
            return this.$store.getters.getLoadingTable
        }

	}
}
</script>

<style scoped>
@media print{

}
</style>
