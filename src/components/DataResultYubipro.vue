<template>
  <div class="container">
    <a-row>
      <a-col class="form" :span="12" :offset="6">
        <img alt="Vue logo" src="../assets/logo.png">
        <div class="title">
          <p class="title-header">Toko Berhasil Dibuat!</p>
          <p class="title-desc">Berikut adalah detail data toko Anda.</p>
        </div>
        <div class="form-container">
          <img src="../assets/store-photo.png" class="image-card"/>
          <div>
            <p class="title-card">{{formState.name}}</p>
            <p style="color:#3C91E6">{{formState.url}}.yukbisnis.website</p>
          </div>
        </div>
        <div class="card">
          <p class="input-title">Detail Alamat</p>
          <p class="input-data">{{formState.address}}</p>

          <p class="input-title">Kode POS</p>
          <p class="input-data">{{formState.postal}}</p>

          <p class="input-title">Kategori Bisnis</p>
          <p class="input-data">{{formState.category}}</p>

          <p class="input-title">Saluran Penjualan</p>
          <p class="input-data">{{formState.sales_channel}}</p>
        </div>
        <div class="card-submit">
          <a-button class="button" @click="showModal" html-type="submit" block danger>Ubah</a-button>
          <a-modal v-model:visible="visible" title="Ubah Data Toko" :footer="null">
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
            <!-- <p class="form-title">Data Toko</p>
            <p class="input-title">Nama Toko</p>
            <a-input size="large" placeholder="Masukkan Nama Toko" />
            <p class="input-title">URL Toko Online</p>
            
              <a-input size="large"  addon-after=".yukbisnis.website" placeholder="Masukkan URL Toko" />

            <p class="input-title">Detail Alamat</p>
            
              <a-textarea  placeholder="Masukkan Jalan, No Rumah/Gedung, RT/RW, Desa/Kelurahan, Kecamatan, Kabupaten, Provinsi" :rows="4" />

            <p class="input-title">Kode POS</p>
            
              <a-input size="large" placeholder="Masukkan Kode POS" />

            <a-divider />
            <p class="form-title">Informasi Bisnis <span class="input-title">(Opsional)</span></p> 
            <p class="input-title">Kategori Bisnis</p>
            
              <a-select
                size="large"
                style="min-width: 70vh;"
                :options="itemsKategori.map(item => ({ value: item }))"
              >
              </a-select>
            

            <p class="input-title">Saluran Penjualan Utama</p>
           
              <a-select
                size="large"
                style="min-width: 70vh;"
                :options="itemsSaluran.map(item => ({ value: item }))"
              >
              </a-select> -->

              <!-- <a-button type="primary" html-type="submit" block danger>Submit</a-button> -->
          </a-modal>
        </div>
        
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
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
        id: this.$route.params.id,
      },
      visible: false,
    }
  },
  mounted() {
    this.getListKategori()
    this.getListSales()
    this.getDataById()
  },
  methods: {
    showModal () {
      this.visible = true;
    },
    getListKategori() {
      this.axios.get('https://6285e14df0e8f0bb7c0b0de3.mockapi.io/api/v1/categories')
      .then((response) => {
        this.itemsKategori = response.data
      })
    },
    getListSales() {
      this.axios.get('https://6285e14df0e8f0bb7c0b0de3.mockapi.io/api/v1/sales_channels')
      .then((response) => {
        this.saluranPenjualan = response.data;
      })
    },
    getDataById() {
      this.axios.get('https://6285e14df0e8f0bb7c0b0de3.mockapi.io/api/v1/store/'+this.$route.params.id)
      .then((response) => {
        this.formState = response.data;
      })
    },
    onFinish(values) {
      this.axios.put('https://6285e14df0e8f0bb7c0b0de3.mockapi.io/api/v1/store/'+this.$route.params.id, values)
        .then((response) => {
          this.getDataById();
          this.visible = false;
      })
    },
    onFinishFailed(errorInfo) {
      console.log('Failed:', errorInfo);
    }
  },
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
  font-size: 14px;
  line-height: 150%;
  color: #D6D4D5;
}
.form-container{
  margin: 48px 48px 0 48px;
  padding: 20px 40px;
  display: flex;
  background-color: #EBF4FC;
  border-radius: 10px 10px 0 0;
  border: #EBF4FC solid 1px;
}
.card{
  margin: 0 48px;
  padding: 20px 30px;
  background-color: #ffffff;
  border-radius: 0 0 10px 10px;
  border: #EBF4FC solid 1px;
}
.card-submit{
  margin: 0 48px;
  padding-top: 25px;
  background-color: #ffffff;
}
.title-card{
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 130%;
  text-align: center;
  color: #00171F;
  text-align: left;
  margin-bottom: 0;
  padding-top: 5px;
}

.image-card{
  width: 56px;
  height: 56px;
  margin-right: 10px;
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
.input-data{
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #00171F;
  text-align: left;
}
.form-title{
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 130%;
  color: #00171F;
  text-align: left;
  margin-top: 20px;
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