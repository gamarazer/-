package com.dataservice;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;  
import org.eclipse.paho.client.mqttv3.MqttMessage;
   
public class PushCallback implements MqttCallback {  
  
    public void connectionLost(Throwable cause) {  
        // ���Ӷ�ʧ��һ�����������������  
        System.out.println("���ӶϿ�������������");  
    }  
    
    public void deliveryComplete(IMqttDeliveryToken token) {
        System.out.println("deliveryComplete---------" + token.isComplete());  
    }

    public void messageArrived(String topic, MqttMessage message) throws Exception {
        // subscribe��õ�����Ϣ��ִ�е�������  
    	// 1 �¶�  2 ʪ��
    	String str = new String(message.getPayload());
    	String[] strs = str.split(" ");
    	if(strs[0].equals("H")){
    	
    		
	    	Post post = new Post();
	    	post.sendPost("http://139.199.97.82:8080/hulianwang/data_save.action", str, strs[1]);
	    	
	    	
	    	System.out.println("������Ϣ���� : " + str);  
    	}   

    }  
}
