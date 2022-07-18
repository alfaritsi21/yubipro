<template>
  <div class="container">
    <a-row>
      <a-col class="form" :span="12" :offset="6">
        <img alt="Vue logo" src="../assets/logo.png">
        <div class="title">
          <p class="title-header">Selamat Datang di Yubipro</p>
          <p class="title-desc">Lengkapi data toko untuk membuat toko online.</p>
        </div>
        <div class="form-container">
          <a-form
            :model="formState"
            name="basic"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <p class="form-title">Data Toko</p>
            <p class="input-title">Nama Toko</p>
            <a-form-item
              name="name"              
              :rules="[{ required: true, message: 'Nama Toko tidak boleh kosong' }]"
            >
              <a-input size="large" v-model:value="formState.name" placeholder="Masukkan Nama Toko" />
            </a-form-item>
            
            <p class="input-title">URL Toko Online</p>
            <a-form-item
              name="url"              
              :rules="[{ required: true, message: 'URL Toko tidak boleh kosong' }]"
            >
              <a-input size="large" v-model:value="formState.url" addon-after=".yukbisnis.website" placeholder="Masukkan URL Toko" />
            </a-form-item>

            <p class="input-title">Detail Alamat</p>
            <a-form-item
              name="address"              
              :rules="[{ required: true, message: 'Alamat tidak boleh kosong' }]"
            >
              <a-textarea v-model:value="formState.address" placeholder="Masukkan Jalan, No Rumah/Gedung, RT/RW, Desa/Kelurahan, Kecamatan, Kabupaten, Provinsi" :rows="4" />
            </a-form-item>

            <p class="input-title">Kode POS</p>
            <a-form-item
              name="postal"              
              :rules="[{ required: true, message: 'Kode POS tidak boleh kosong' }]"
            >
              <a-input size="large" v-model:value="formState.postal" placeholder="Masukkan Kode POS" />
            </a-form-item>

            <a-divider />
            <p class="form-title">Informasi Bisnis <span class="input-title">(Opsional)</span></p> 
            <p class="input-title">Kategori Bisnis</p>
            <a-form-item
              name="category"              
            >
              <a-select
                size="large"
                v-model:value="formState.category"
                style="min-width: none;"
                :options="itemsKategori.map(item => ({ value: item.name }))"
              >
              </a-select>
            </a-form-item>

            <p class="input-title">Saluran Penjualan Utama</p>
            <a-form-item
              name="sales_channel"              
            >
              <a-select
                size="large"
                v-model:value="formState.sales_channel"
                style="min-width: none;"
                :options="saluranPenjualan.map(item => ({ value: item.name }))"
              >
              </a-select>
            </a-form-item>

            <a-form-item>
              <a-button type="primary" html-type="submit" block danger>Submit</a-button>
            </a-form-item>

          </a-form>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  data() {
    return {
      itemsKategori: [],
      saluranPenjualan: [],
      formState : {
        name: '',
        url: '',
        address: '',
        postal: '',
        category: 'Pilih Kategori Bisnis',
        sales_channel: 'Pilih Saluran Penjualan Utama',
      }
    }
  },
  mounted() {
    this.getListKategori()
    this.getListSales()
  },
  methods: {
    getListKategori() {
      this.axios.get('https://6285e14df0e8f0bb7c0b0de3.mockapi.io/api/v1/categories')
      .then((response) => {
        this.itemsKategori = response.data
      })
    },
    getListSales() {
      this.axios.get('https://6285e14df0e8f0bb7c0b0de3.mockapi.io/api/v1/sales_channels')
      .then((response) => {
        this.saluranPenjualan = response.data
      })
    },
    onFinish(values) {
      this.axios.post('https://6285e14df0e8f0bb7c0b0de3.mockapi.io/api/v1/store', values)
        .then((response) => {
          this.$router.push('/result/'+response.data.id);
      })
    },
    onFinishFailed(errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

});
</script>

<style>
.container{
  background-color: #E5E5E5;
  margin: 0;
}

.form{
  background-color: #ffffff;
  min-height: 100vh;
  padding: 40px 30px;
}
.title{
  margin-top: 25px;
}
.title-header{
  font-weight: 700;
  font-size: 24px;
  line-height: 130%;
  color: #00171F;
}
.title-desc{
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #D6D4D5;
}
.form-container{
  padding: 20px 40px;
}
.form-title{
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 130%;
  color: #00171F;
  text-align: left;
}
.input-title{
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #847F82;
  text-align: left;
  margin-bottom: 5px;
}

</style>