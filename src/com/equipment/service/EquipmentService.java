package com.equipment.service;


import java.util.List;
import com.equipment.dao.EquipmentDao;
import com.equipment.vo.Equipment;

public class EquipmentService {
	private EquipmentDao equipmentDao;
	

	public void setEquipmentDao(EquipmentDao equipmentDao) {
		this.equipmentDao = equipmentDao;
	}

	// ���û�����ѯ�û�
	public Equipment findByName(String name){
		return equipmentDao.findByName(name);
	}
	
	public List<Equipment> findByUserId(Integer id){
		return equipmentDao.findByUserId(id);
	}
	
	public List<Equipment> findAll() {
		return equipmentDao.findAll();
	}

	public void save(Equipment equipment) {
		// �����ݴ��뵽���ݿ�
		equipmentDao.save(equipment);
	}

	public void delete(Equipment exist) {
		equipmentDao.delete(exist);
	}
}
