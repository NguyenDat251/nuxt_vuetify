<template>
  <div>
    <h5>{{label}}</h5>
    <v-text-field
      outlined
      v-model="InsideValue"
      :rules="rules.name"
      color="primary"
      required
      @change="$emit('onChangeTextField', InsideValue)"
      dense
    ></v-text-field>
  </div>
</template>

<script>
export default {
    props: {
        label: String,
        value: String,
        isRuleUsed: Boolean
  },
  data() {
      return{
      rules: {
        name: [val => (val || '').length > 0 || 'This field is required'],
      },
      InsideValue: this.value
      }
  },
  methods:{
    onChange: function(){
      console.log(this.InsideValue);
      //this.value = this.InsideValue;
    }
  },
  created: function(){
      if(!this.isRuleUsed)
        this.rules.name = [true]
      
  },
  watch: {
    value: function(newVal, oldVal){
      this.InsideValue = newVal
    }
  }
}
</script>