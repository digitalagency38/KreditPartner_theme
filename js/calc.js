const { createApp, reactive, ref, computed, watch, nextTick } = Vue

const app = Vue.createApp({
	data() {
		return {
			price: {
				value: 100000,
				min: 50000,
				max: 1000000,
				step: 10000
			},
			period: {
				value: 12,
				min: 1,
				max: 60,
				step: 1
			},
			result: 0,
			params: {
				percentSum: 0,
				percentOst: 29,
				percentEdin: 0
			}
		}
	},
	computed: {
		pricePercent() {
			return ((this.price.value - this.price.min) * 100) / (this.price.max - this.price.min) // так будет без искажений
		},
		periodPercent() {
			const value = ((this.period.value - this.period.min) * 100) / (this.period.max - this.period.min) // так будет без искажений
			return value.toFixed(2)
		},
		publicSum() {
			return this.showValue(this.price.value)
		},
		returnSum() { // сумма к возврату
			const rSum = this.countResult()
			return this.showValue(rSum)
		},
		monthlyPaymentMax() { // расчет максимального ежемесячного платежа, не считая единоразовую выплату ДВЧ
		    const params = this.params
		    const rate = (params.percentOst + params.percentSum) / 1200
			const value = Math.round((this.price.value * rate) + (this.price.value / this.period.value))
			return this.showValue(value)
		},
		monthlyPaymentMin() { // расчет минимального ежемесячного платежа, не считая единоразовую выплату ДВЧ
		    const params = this.params
			const value = Math.round((this.price.value * (params.percentSum)/1200) + 
			                ((this.price.value / this.period.value) * (params.percentOst)/1200) + 
			                (this.price.value / this.period.value))
			return this.showValue(value)
		},
		monthlyPayment() {
			//const rate = this.price.value * 0.2
			//const monthPerc = rate / 12
			//const value = Math.round(( this.price.value + monthPerc * this.period.value) / this.period.value)
			
			// расчет среднего ежемесячного платежа, считая единоразовую выплату ДВЧ
			const value = Math.round(this.countResult() / this.period.value)
			return this.showValue(value)
		}
	},
	methods: {
		countResult() {
			const sum = this.price.value
			const time = this.period.value
			const params = this.params
			// добавил +sum - теперь сумма к возврату точна 
			const value = sum * (params.percentOst / 1200) * this.dsumost(time) + (time * sum) * (params.percentSum / 1200) + sum * (params.percentEdin / 100) + sum
			//this.result = Math.round(value)
			return Math.round(value)
		},
		dsumost(m) {
			let ss = 0
			for (let k = 1; k < m + 1; k++) {
				ss = ss + (1 - (k - 1) / m)
			}
			return ss
		},
		showValue(value) {
			value = String(value)
			switch (value.length) {
				case 4:
					return value.slice(0, 1) + " " + value.slice(1, value.length)
				case 5:
					return value.slice(0, 2) + " " + value.slice(2, value.length)
				case 6:
					return value.slice(0, 3) + " " + value.slice(3, value.length)
				case 7:
					return value.slice(0, 1) + " " + value.slice(1, 4) + " " + value.slice(4, value.length)
				default:
					return value
			}
		}
	},
	watch: {
		'price.value'() { this.countResult() },
		'period.value'() { this.countResult() }
	}
})

app.mount("#raschet")
